const uploadFile = (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const fileUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
  res.status(200).json({ path: req.file.path, url: fileUrl });
};

const uploadCV = (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No CV file uploaded' });
  const cvUrl = `${req.protocol}://${req.get('host')}/${req.file.path}`;
  res.status(200).json({ 
    message: 'CV uploaded successfully',
    path: req.file.path, 
    url: cvUrl,
    cvUrl: cvUrl,
    filename: req.file.filename
  });
};

module.exports = { uploadFile, uploadCV };
