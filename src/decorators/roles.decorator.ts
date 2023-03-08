import { SetMetadata } from '@nestjs/common';
import { META } from 'src/constants';

export const Roles = (...roles: string[]) => SetMetadata(META.roles, roles);
