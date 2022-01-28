import tours from '../../../public/tours/tours.json'

export default function handler(req, res) {
    const { id } = req.query
    if (req.method === 'GET') {
        // Process a GET request
        // return the object in tours that has the same id attribute value
        const tour = tours.find(tour => tour.id === id)
        res.status(200).json(tour)
    } else {
        // Raise an error
        res.status(405).json({
            message: 'Method Not Allowed',
        });
    }
}