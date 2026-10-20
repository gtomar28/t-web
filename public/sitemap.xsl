<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Trevyk sitemap</title>
        <style>
          body { margin: 0; background: #160A1C; color: #F8F6FB; font-family: Georgia, serif; }
          main { max-width: 820px; margin: 0 auto; padding: 48px 20px 80px; }
          p, a, li { font-family: "Segoe UI", sans-serif; }
          .kicker { letter-spacing: 0.22em; text-transform: uppercase; color: #E8A9C2; font-size: 12px; }
          h1 { font-size: 42px; margin: 8px 0 12px; }
          a { color: #E8A9C2; }
          ol { list-style: none; padding: 0; }
          li { border: 1px solid rgba(185,166,209,0.35); border-radius: 16px; padding: 14px 16px; margin: 10px 0; background: #1E1024; }
          .loc { font-size: 16px; }
          .meta { color: #B9A6D1; font-size: 12px; margin-top: 4px; }
        </style>
      </head>
      <body>
        <main>
          <div class="kicker">trevyk.in</div>
          <h1>Sitemap</h1>
          <p>Pages we ask search engines to index. A designed index of the same pages lives at <a href="/sitemap">/sitemap</a>.</p>
          <ol>
            <xsl:for-each select="s:urlset/s:url">
              <li>
                <a class="loc" href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                <div class="meta">Updated <xsl:value-of select="s:lastmod"/> · priority <xsl:value-of select="s:priority"/></div>
              </li>
            </xsl:for-each>
          </ol>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
