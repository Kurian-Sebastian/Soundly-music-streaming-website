import {auth} from '@/lib/random_functions';

export default function handler(req, res) {
  auth(req);

  res.status(200).json({ name: req.user.email })
}
