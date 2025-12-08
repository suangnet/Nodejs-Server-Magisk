#!/system/bin/sh

ui_print "- Install to: $MODPATH"
ui_print "- Set permission files..."

set_perm_recursive $MODPATH 0 0 0755 0644
set_perm_recursive $MODPATH/bin 0 0 0755 0755

if [ -f "$MODPATH/service.d/nodejs_service.sh" ]; then
    ui_print "- Moving service script..."
    mv $MODPATH/service.d/nodejs_service.sh /data/adb/service.d/nodejs_service.sh
    set_perm /data/adb/service.d/nodejs_service.sh 0 0 0755
    rmdir $MODPATH/service.d
fi

ui_print "- Permission have been set"
ui_print " "
ui_print "[100] Finish!"
ui_print "Reboot to start server"
ui_print "Support: https://t.me/suangnet"
ui_print " "