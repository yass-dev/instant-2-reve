import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';

export default {
	storage: diskStorage({
		destination: './uploads'
	})
}

export const imageFileFilter = (req, file, callback) =>
{
	if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
	{
		req.file_filter_error = 'Only image files are allowed.';
		callback(null, false);
	}
	callback(null, true);
};