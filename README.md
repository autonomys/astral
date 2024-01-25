![build](https://github.com/subspace/blockexplorer/actions/workflows/build.yaml/badge.svg)

# Astral

- [Astral](https://subspace.network/) Subspace Block Explorer
- [Astral Subsquid Playground](https://squid.gemini-3g.subspace.network/graphql) Astral Subspace SubSquid

<table width="100%" border="0">
    <tr>
        <td width="50%" valign="top" border="0">
        <picture>
          <source 
              srcset="https://github.com/subspace/astral/assets/82244926/e7614121-ed11-4f82-9af6-971df3ed0ef0"
              media="(prefers-color-scheme: dark)"
          />
          <source
              srcset="https://github.com/subspace/astral/assets/82244926/e7614121-ed11-4f82-9af6-971df3ed0ef0"
              media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
          />
          <img
            alt="Astral Subspace Block Explorer"
            src="https://github.com/subspace/astral/assets/82244926/e7614121-ed11-4f82-9af6-971df3ed0ef0"
            align="left"
            width="100%"
        />
        </picture>
      </td>
    <td width="50%" valign="top" border="0">
      <picture>
      <source 
          srcset="https://github.com/subspace/astral/assets/82244926/b440c10f-8051-4107-b5e4-0ead524a9254"
          media="(prefers-color-scheme: dark)"
      />
      <source
          srcset="https://github.com/subspace/astral/assets/82244926/b440c10f-8051-4107-b5e4-0ead524a9254"
          media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
      />
      <img
          alt="Astral Subspace Block Explorer"
          src="https://github.com/subspace/astral/assets/82244926/b440c10f-8051-4107-b5e4-0ead524a9254"
          align="left"
          width="100%"
      />
</picture>
        </td>
    <tr>
</table>

## Overview    

- [Client](./client/README.md) - UI app based on React
- [Squid](./squid-blockexplorer/README.md) - backend app, utilizes [Subsquid Framework](https://docs.subsquid.io/overview/) for indexing and transforming chain data as well as exposing it using GraphQL
- [Health check](./health-check/README.md) - utility service to check health status of an internal service and expose it as a REST API endpoint
