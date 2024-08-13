import { Request, Response } from 'express';

export const getAnnouncements = (req: Request, res: Response) => {
    console.log('Get All Announcements');

    res.status(200).json({ announcements: [{ title: 'ahoj' }] });
};

export const createAnnouncement = (req: Request, res: Response) => {
    const { title, publicationDate, lastUpdate, categories } = req.body;

    console.log({
        title,
        publicationDate,
        lastUpdate,
        categories
    });

    res.status(201).json({ message: 'Announcement created successfully!' });
};

export const getAnnouncementById = (req: Request, res: Response) => {
    const { id } = req.params;

    console.log(`get announcement by ID: ${id}`);

    res.status(200).json({ title: 'ahoj' });
};

export const updateAnnouncement = (req: Request, res: Response) => {
    const { id } = req.params;
    // const { title, publicationDate, lastUpdate, categories } = req.body;

    console.log(`update announcement by ID: ${id}`);

    res.status(200).json({ title: 'ahoj' });
};

export const deleteAnnouncement = (req: Request, res: Response) => {
    const { id } = req.params;

    console.log(`delete anouncement by ID: ${id}`);

    res.status(200).json({ message: 'Announcement deleted successfully!' });
};