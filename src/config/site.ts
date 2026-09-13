/**
 * Site-wide identity and configuration.
 * Page copy lives in src/content/ — this file is only the facts that appear in
 * more than one place (header, footer, meta tags, mailto links).
 */
export const site = {
  teamNumber: 11744,
  teamName: 'Nyx',
  fullName: 'FRC Team 11744 — Nyx',
  location: 'San Diego, California',
  rookieYear: 2026,

  /** Falls back into <meta name="description"> when a page sets none. */
  description:
    'PLACEHOLDER — one or two sentences describing Nyx for search results and link previews.',

  contact: {
    email: 'frcnyx@gmail.com',
  },

  /** Path inside public/ — drop the PDF there to activate the download button. */
  sponsorPacket: '/Team Nyx Sponsorship Packet.pdf',

  social: [
    { label: 'GitHub', handle: 'Nyx-11744', url: 'https://github.com/Nyx-11744' },
    { label: 'Instagram', handle: 'PLACEHOLDER', url: '#', placeholder: true },
    { label: 'YouTube', handle: 'PLACEHOLDER', url: '#', placeholder: true },
    { label: 'Email', handle: 'frcnyx@gmail.com', url: 'mailto:frcnyx@gmail.com' },
  ] as ReadonlyArray<{
    label: string;
    handle: string;
    url: string;
    placeholder?: boolean;
  }>,
};

export default site;
