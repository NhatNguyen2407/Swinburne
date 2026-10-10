from http.server import BaseHTTPRequestHandler, HTTPServer


class HelloHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        message = b"Hello from my Python Docker app!\n"
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Content-Length", str(len(message)))
        self.end_headers()
        self.wfile.write(message)


server = HTTPServer(("0.0.0.0", 8000), HelloHandler)
print("Python server listening on port 8000", flush=True)
server.serve_forever()
