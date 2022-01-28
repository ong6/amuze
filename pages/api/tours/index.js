import tours from '../../../public/tours/tours.json'

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Process a GET request
        res.status(200).json(tours);
    } else {
        // Raise an error
        res.status(405).json({
            message: 'Method Not Allowed',
        });
    }
}