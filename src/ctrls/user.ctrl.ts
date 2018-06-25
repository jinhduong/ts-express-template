import * as express from 'express';
import * as bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req: any, res) => {
    res.status(200).json(req.id);
});

export = router;

