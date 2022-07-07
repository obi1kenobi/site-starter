"use strict";
const queryBox = document.getElementById("query");
const varsBox = document.getElementById("vars");
const runButton = document.getElementById("run");
const moreButton = document.getElementById("more");
const resultsBox = document.getElementById("results");
const queryWorker = new Worker("www/adapter.js", { type: "module" });
const fetcherWorker = new Worker("www/fetcher.js", { type: "module" });
function setup(then) {
    const channel = new MessageChannel();
    queryWorker.postMessage({ op: "init" });
    fetcherWorker.postMessage({ op: "channel", data: { port: channel.port2 } }, [channel.port2]);
    function cleanUp() {
        queryWorker.removeEventListener('message', awaitInitConfirmation);
    }
    function awaitInitConfirmation(e) {
        let data = e.data;
        if (data === "ready") {
            queryWorker.postMessage({ op: "channel", data: { port: channel.port1 } }, [channel.port1]);
            cleanUp();
            then();
        }
        else {
            throw new Error(`Unexpected message: ${data}`);
        }
    }
    queryWorker.onmessage = awaitInitConfirmation;
}
function enableUI() {
    queryWorker.onmessage = handleQueryMessage;
    queryWorker.onmessageerror = handleQueryError;
    runButton.disabled = false;
    runButton.onclick = runQuery;
    moreButton.onclick = nextResult;
}
setup(enableUI);
function runQuery() {
    resultsBox.textContent = "";
    const query = queryBox.value;
    let vars;
    if (varsBox.value === null) {
        vars = {};
    }
    else {
        try {
            vars = JSON.parse(varsBox.value);
        }
        catch (e) {
            resultsBox.textContent = `Invalid variables data: ${e}`;
            return;
        }
    }
    moreButton.disabled = false;
    queryWorker.postMessage({
        op: "query",
        query,
        args: vars,
    });
}
function nextResult() {
    queryWorker.postMessage({
        op: "next",
    });
}
function handleQueryMessage(e) {
    let outcome = e.data;
    if (outcome.done) {
        if (!resultsBox.textContent?.endsWith("***")) {
            resultsBox.textContent += "*** no more data ***";
            moreButton.disabled = true;
        }
    }
    else {
        let pretty = JSON.stringify(outcome.value, null, 2);
        resultsBox.textContent += `${pretty}\n`;
    }
    resultsBox.scrollTop = resultsBox.scrollHeight;
    resultsBox.scrollIntoView();
}
function handleQueryError(e) {
    moreButton.disabled = true;
    resultsBox.textContent = `Query error: ${e.data}`;
}
