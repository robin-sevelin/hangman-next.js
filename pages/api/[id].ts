import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  req.query.id;
  const letters = [
    { id: 0, word: 'bil' },
    { id: 1, word: 'hund' },
    { id: 2, word: 'katt' },
    { id: 3, word: 'äpple' },
    { id: 4, word: 'specialistsjuksköterskeutbildningarna' },
  ];

  const result = letters.find((letter) => letter.id === Number(req.query.id));

  res.status(200).send(result);
}
