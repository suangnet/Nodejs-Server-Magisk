#!/system/bin/sh
# Auto-start the Node.js service on boot.
# node_run -s is idempotent (no-op if already running).
MODDIR=${0%/*}
"$MODDIR/bin/node_run" -s >>"$MODDIR/var/log/node.log" 2>&1
