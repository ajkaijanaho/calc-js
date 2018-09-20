import http.server
import socketserver

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

Handler.extensions_map = { ".mjs": "text/javascript",
                           ".html" : "text/html",
                           ".css" : "text/css",
                           "" : "application/octet-stream" }

with socketserver.TCPServer(("localhost", PORT), Handler) as httpd:
    print("serving at http://localhost:%d/" % PORT)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("Terminating.")
        httpd.server_close()
