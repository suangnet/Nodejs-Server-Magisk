# Changelog

## v1.1.2
- Update Node.js LTS binary to v24.22.2 (ARM & ARM64) from official Termux repository.
- Update shared libraries: c-ares 1.34.9, OpenSSL 3.6.5, ICU 79.1, SQLite 3.54.1, zlib 1.4, libc++ 30.
- Add background supervisor auto-restart loop in `node_run` to auto-recover when process exits.
- Add log rotation for `node.log` (rotates when exceeding 1MB).
- Add support for multiple busybox binaries (Magisk, KernelSU, APatch, system xbin).
- Add module root `service.sh` for KernelSU and APatch late-start service compatibility.
- Run `service.d/nodejs_service.sh` boot detection in non-blocking background subshell.
- Add safe process termination via targeted pattern matching (`pkill -f`).

## v1.1.0
- Add support for `.env` configuration file.
- Add dual architecture support: ARM (32-bit) and ARM64 (64-bit).
- Improve installer architecture detection.
