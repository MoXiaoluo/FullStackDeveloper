import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const IS_ADMIN = 'isAdmin';

export const Admin = () => SetMetadata(IS_ADMIN, true);
