# tropia-mcp: Polish company data (KRS) for AI assistants

MCP server with data on Polish companies from the National Court Register (KRS), provided by [tropia.pl](https://tropia.pl).
This image is a small stdio bridge to the hosted server `https://api.tropia.pl/mcp`, for MCP clients that run servers as local processes (Docker MCP Toolkit, Claude Desktop, Cursor, Cline and others).

## Tools

| tool | what it returns |
|---|---|
| `search_companies` | find companies by name, NIP, REGON or KRS number |
| `get_company` | registry profile: legal form, status, dates, address, share capital, PKD, former names |
| `get_company_connections` | board members, supervisory board, shareholders, proxies: current and historical |
| `get_company_events` | timeline of registry changes (KRS and MSiG) |
| `get_financials` | multi-year financials: revenue, net profit, assets, equity |
| `get_financial_statement` | full financial statement for a given year |
| `get_public_aid` | public aid received (SUDOP) |
| `get_public_contracts` | NFZ contracts, public contracts and won tenders |
| `get_account` | API key balance and usage (free) |

## Quick start

Get an API key (a free test key is available) at **[tropia.pl/api](https://tropia.pl/api)**.

```bash
docker run -i --rm -e TROPIA_API_KEY=trp_your_key ddaapp/tropia-mcp
```

Client configuration (Claude Desktop, Cursor and others):

```json
{
  "mcpServers": {
    "tropia": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "TROPIA_API_KEY", "ddaapp/tropia-mcp"],
      "env": { "TROPIA_API_KEY": "trp_your_key" }
    }
  }
}
```

Clients that support remote MCP servers can connect directly to `https://api.tropia.pl/mcp` with the header `Authorization: Bearer trp_your_key`, without Docker.

## Environment

| variable | default | |
|---|---|---|
| `TROPIA_API_KEY` | (none) | API key from [tropia.pl/api](https://tropia.pl/api) |
| `TROPIA_MCP_URL` | `https://api.tropia.pl/mcp` | server address |

## Links

- Website: [tropia.pl](https://tropia.pl): company profiles, ownership graphs with history, financial statements
- API documentation: [tropia.pl/api/dokumentacja](https://tropia.pl/api/dokumentacja)
- Source: [github.com/ddaapp/tropia-mcp](https://github.com/ddaapp/tropia-mcp)
- MCP Registry: `pl.tropia/mcp`

The bridge has no dependencies (Node.js 22, alpine). Licence: MIT.
