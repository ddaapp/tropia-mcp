FROM node:22-alpine
LABEL org.opencontainers.image.title="tropia-mcp" \
      org.opencontainers.image.description="MCP server for Polish company data (KRS): stdio bridge to https://api.tropia.pl/mcp" \
      org.opencontainers.image.url="https://tropia.pl/api" \
      org.opencontainers.image.source="https://github.com/ddaapp/tropia-mcp" \
      org.opencontainers.image.licenses="MIT"
COPY bridge.mjs /app/bridge.mjs
USER node
ENTRYPOINT ["node", "/app/bridge.mjs"]
