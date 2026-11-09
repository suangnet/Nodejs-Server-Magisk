#!/system/bin/sh

(
	# Wait boot completely
	until [ "$(getprop sys.boot_completed)" = "1" ]; do sleep 2; done

	# Wait system ready
	sleep 5

	# Path script
	NODE_RUN="/data/adb/modules/nodejs/bin/node_run"

	# Start Node.js service
	if [ -f "$NODE_RUN" ]; then
		chmod +x "$NODE_RUN"
		sh "$NODE_RUN" -s
	fi
) &
