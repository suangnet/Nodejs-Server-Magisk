#!/system/bin/sh

ui_print "- Installing Node.js LTS Server..."

case $ARCH in
  arm|armeabi|armeabi-v7a)
    ui_print "- Detected Architecture: ARM (32-bit)"
    ARCH_DIR="arm"
    ;;
  arm64|aarch64|arm64-v8a)
    ui_print "- Detected Architecture: ARM64 (64-bit)"
    ARCH_DIR="arm64"
    ;;
  x86|x64)
    ui_print "- Detected Architecture: x86/x64"
    abort "❌ x86 architecture is not supported"
    ;;
  *)
    abort "❌ Unsupported architecture: $ARCH"
    ;;
esac

ui_print "- Extracting files for $ARCH..."

mkdir -p "$MODPATH/lib"
cp -f "$MODPATH/files/$ARCH_DIR/bin/node" "$MODPATH/bin/node"
cp -rf "$MODPATH/files/$ARCH_DIR/lib/"* "$MODPATH/lib/"
rm -rf "$MODPATH/files"

ui_print "- Setting permissions..."

set_perm_recursive $MODPATH 0 0 0755 0644
set_perm_recursive $MODPATH/bin 0 0 0755 0755
set_perm_recursive $MODPATH/lib 0 0 0755 0644

ui_print "- Set up global service..."
if [ -f "$MODPATH/service.d/nodejs_service.sh" ]; then
    mv $MODPATH/service.d/nodejs_service.sh /data/adb/service.d/nodejs_service.sh
    set_perm /data/adb/service.d/nodejs_service.sh 0 0 0755
    rmdir $MODPATH/service.d
fi

ui_print "- Installation complete!"
ui_print "- Reboot to start Node.js server."
ui_print "- Support: https://t.me/suangnet"