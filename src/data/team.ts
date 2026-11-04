/**
 * Founders. Leave a field empty until the real value exists: an empty photo
 * shows the monogram and an empty link shows as pending, never as a dead link.
 * Photos go in public/images/team/ (square, at least 240x240).
 */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  linkedin: string;
  github: string;
  email: string;
}

export const team: TeamMember[] = [
  {
    id: 'andre',
    name: 'Andre',
    role: 'Co-founder & Full Stack Developer',
    photo: '/images/team/andre.png',
    linkedin: 'https://www.linkedin.com/in/giancano/',
    github: 'https://github.com/AnndriuuW',
    email: 'giancg51@gmail.com',
  },
  {
    id: 'augusto',
    name: 'Augusto',
    role: 'Co-founder & Mobile Developer',
    photo: '/images/team/augusto.png',
    linkedin: 'https://www.linkedin.com/in/augusto-alcarraza/',
    github: 'https://github.com/Jesus120902',
    email: 'augusto.jesusalcarraz@gmail.com',
  },
];
