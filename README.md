# tropia.pl MCP server and API: Polish company data from KRS

Remote [Model Context Protocol](https://modelcontextprotocol.io) server and REST API by [tropia.pl](https://tropia.pl), the Polish company intelligence service built on the National Court Register (KRS).

Ask Claude, Cursor or any MCP client about a Polish company and get answers from registry data:

- **1.2 million entities from KRS** (913,000 active): companies, foundations, associations, cooperatives
- **Current and historical connections**: board members, supervisory boards, shareholders and proxies with dates from/to: who ran or owned a company in the past, not only today
- **Registry change history** from KRS and the Court and Economic Monitor (MSiG)
- **Financial statements** of 630,000 companies from the eKRS repository: revenue, profit, assets, equity; full balance sheet and P&L line by line where available
- **State aid** received (SUDOP, UOKiK) and **public contracts** (NFZ, Central Register of Contracts, e-Zamówienia)

Full service with interactive connection graphs: **[tropia.pl](https://tropia.pl)** · API keys and pricing: **[tropia.pl/api](https://tropia.pl/api)**

## Connect

Server URL (Streamable HTTP, no installation):

```
https://api.tropia.pl/mcp
```

### Claude Code

```bash
claude mcp add --transport http tropia https://api.tropia.pl/mcp --header "Authorization: Bearer trp_YOUR_KEY"
```

### Claude Desktop, Cursor, Windsurf and other clients

```json
{
  "mcpServers": {
    "tropia": {
      "url": "https://api.tropia.pl/mcp",
      "headers": { "Authorization": "Bearer trp_YOUR_KEY" }
    }
  }
}
```

Clients that cannot send headers can pass the key in the URL: `https://api.tropia.pl/mcp?klucz=trp_YOUR_KEY`.

### API key

Get a key at [tropia.pl/api](https://tropia.pl/api). The free demo key works for three showcase companies (ORLEN, CD PROJEKT, 4MASS):

```
trp_demo_1daaac3ab3d6d898
```

Paid keys are prepaid: each call costs 0.03–0.20 PLN, the price is listed in every tool description, and calls for a KRS number that does not exist are free. `tools/list` and `initialize` work without a key.

## Tools

| Tool | What it returns | Cost |
|---|---|---|
| `search_companies` | Companies by name, NIP, REGON or KRS number | 0.03 PLN |
| `get_company` | Registry profile; with `full=true` also current governing bodies, PKD codes, court, liquidation/bankruptcy states | 0.03 PLN |
| `get_company_connections` | People and entities connected with the company, current and historical, with roles and dates | 0.03 PLN |
| `get_company_events` | Timeline of registry changes (appointments, dismissals, shareholder changes) | 0.05 PLN |
| `get_financials` | Revenue, net profit, total assets and equity per year | 0.03 PLN |
| `get_financial_statement` | Financial statement for one year, with full balance sheet, P&L and cash flow where available | 0.20 PLN |
| `get_public_aid` | State aid per year and individual grants (SUDOP) | 0.10 PLN |
| `get_public_contracts` | NFZ contracts, Central Register of Contracts, won public tenders | 0.10 PLN |
| `get_account` | Key balance and 30-day usage | free |

All tools are read-only. Field names and values are in Polish; amounts are in PLN.

## Example prompts

- *"Who is on the management board of ORLEN and since when?"*
- *"Show the revenue and net profit of CD PROJEKT for the last five years."*
- *"Which companies did the shareholders of this company own before? KRS 0000699821"*
- *"Did this company receive state aid or win public tenders?"*

## REST API

The same data is available over plain HTTPS: base URL `https://api.tropia.pl/v1`, Bearer authentication, OpenAPI 3.0 specification in [`openapi.json`](openapi.json) (also served at [api.tropia.pl/openapi.json](https://api.tropia.pl/openapi.json)). Documentation: [tropia.pl/api/dokumentacja](https://tropia.pl/api/dokumentacja).

```bash
curl -H "Authorization: Bearer trp_demo_1daaac3ab3d6d898" https://api.tropia.pl/v1/firma/0000028860
```

## Data and privacy

Data comes from public Polish registers: KRS (Ministry of Justice), MSiG, the eKRS financial documents repository, SUDOP (UOKiK), NFZ, the Central Register of Contracts and e-Zamówienia. PESEL numbers never leave the server. Personal data follows the GDPR objection process described at [tropia.pl](https://tropia.pl); the MCP server does not expose person search or beneficial owner (CRBR) data.

---

## Po polsku

Serwer MCP i API [tropia.pl](https://tropia.pl): dane o polskich spółkach z KRS dla asystentów AI (Claude, Cursor i inne). Profil rejestrowy, aktualne i historyczne powiązania (zarząd, rada nadzorcza, wspólnicy, prokurenci), historia zmian z KRS i MSiG, sprawozdania finansowe, pomoc publiczna (SUDOP) i kontrakty publiczne.

Adres serwera: `https://api.tropia.pl/mcp`. Klucz API i cennik: [tropia.pl/api](https://tropia.pl/api). Sprawdź spółkę i jej powiązania na mapie: [tropia.pl](https://tropia.pl).

## License

Documentation and the OpenAPI specification in this repository: MIT. Data served by the API: see [tropia.pl](https://tropia.pl) terms.
