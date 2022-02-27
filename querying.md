## How to Query (Almost) Everything

Interesting and valuable data is all around us — and yet it's surprisingly difficult to get answers
to many seemingly simple questions. This is a problem I've been passionate about since 2015.

While working at [Kensho](https://www.kensho.com/), I started a query compiler project designed to empower everyone (even non-engineers) to make use of datasets available to them. The query system is responsible for creating a schema covering all available data across all databases, and allows the user to write cross-database queries without needing to know about the location and representation of the various bits of data involved in the query.

The project I built at [Kensho](https://www.kensho.com/) is now open source on GitHub, under the name [GraphQL compiler](https://github.com/kensho-technologies/graphql-compiler) — in retrospect, a name I somewhat regret name since the query language uses GraphQL-compatible syntax but has significant differences in query semantics.

I've written several blog posts describing the compiler and its use at [Kensho](https://www.kensho.com/):

- [Database-agnostic querying is unavoidable at scale](https://blog.kensho.com/database-agnostic-querying-is-unavoidable-at-scale-18895f6df2f0)
- [Compiled GraphQL as a database query language](https://blog.kensho.com/compiled-graphql-as-a-database-query-language-72e106844282)

More recently, I've successfully extended the same ideas beyond querying just databases, and added support for querying APIs, raw files, ML models, or any other data source.

For example, here is a query over the source code files of GraphQL compiler itself, asking the question "Find all Python classes whose definition starts with a comment."
[https://twitter.com/PredragGruevski/status/1344725604520878080](https://twitter.com/PredragGruevski/status/1344725604520878080)

If you're interested in querying across API and dataset boundaries, please reach out — I'd love to hear about your use case. My [Twitter](https://twitter.com/PredragGruevski) DMs are open!
