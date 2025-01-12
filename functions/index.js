const { onRequest } = require("firebase-functions/v2/https");
const { default: next } = require("next");

const server = next({
  dev: false,
  conf: {
    // ค่าคอนฟิก Next.js เพิ่มเติม (ถ้ามี)
  },
});

const nextjsHandle = server.getRequestHandler();

exports.nextjs = onRequest((req, res) => {
  return server.prepare().then(() => nextjsHandle(req, res));
});
