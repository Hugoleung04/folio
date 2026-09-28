#!/usr/bin/env python3
"""Folio local launcher. Serves this folder and opens the browser."""
from __future__ import print_function

import os
import socket
import sys
import threading
import webbrowser

try:
    from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
except ImportError:
    from SimpleHTTPServer import SimpleHTTPRequestHandler  # type: ignore
    from SocketServer import ThreadingTCPServer as ThreadingHTTPServer  # type: ignore


ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)

PREFERRED = 8765
HOST = "127.0.0.1"


def pick_port(start):
    for port in range(start, start + 20):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            sock.bind((HOST, port))
            sock.close()
            return port
        except OSError:
            try:
                sock.close()
            except Exception:
                pass
    raise RuntimeError("No free port found")


class Handler(SimpleHTTPRequestHandler):
    extensions_map = SimpleHTTPRequestHandler.extensions_map.copy()
    extensions_map.update({
        ".js": "application/javascript",
        ".mjs": "application/javascript",
        ".json": "application/json",
        ".wasm": "application/wasm",
        ".pdf": "application/pdf",
    })

    def log_message(self, fmt, *args):
        sys.stderr.write("[%s] %s\n" % (self.log_date_time_string(), fmt % args))

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        SimpleHTTPRequestHandler.end_headers(self)


def main():
    port = pick_port(PREFERRED)
    url = "http://%s:%d/" % (HOST, port)
    httpd = ThreadingHTTPServer((HOST, port), Handler)

    print("")
    print("  Folio is running")
    print("  " + url)
    print("  Keep this window open. Press Ctrl+C to stop.")
    print("")

    threading.Timer(0.6, lambda: webbrowser.open(url)).start()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
    finally:
        httpd.server_close()


if __name__ == "__main__":
    main()
