#!/system/bin/sh

# Wait system to fully boot
until [ "$(getprop sys.boot_completed)" = "1" ]; do
    sleep 1
done

# Wait system ready
sleep 5

# Path script
NODE_RUN="/data/adb/modules/nodejs/bin/node_run"

# Start Node.js service
if [ -f "$NODE_RUN" ]; then
    $NODE_RUN -s
fi