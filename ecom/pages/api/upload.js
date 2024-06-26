import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { isAdmin } from "./auth/[...nextauth]";



// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'public/images';
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Disable Next.js body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Middleware to handle file upload
const uploadMiddleware = upload.array('files');

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// API Route Handler
export default async function handler(req, res) {

  isAdmin(req,res);
  if (req.method === 'POST') {
    try {
      await runMiddleware(req, res, uploadMiddleware);
      const filenames = req.files.map((file)=>`/images/${file.filename}`);
      res.status(200).json({ success: true, filenames });
    } catch (error) {
      res.status(500).json({ success: false, error: `Something went wrong! ${error.message}` });
    }
  } else {
    res.status(405).json({ success: false, error: `Method '${req.method}' not allowed` });
  }
}
