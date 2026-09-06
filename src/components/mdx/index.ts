import Cards from './Cards.astro';
import Card from './Card.astro';
import Steps from './Steps.astro';
import Step from './Step.astro';
import Timeline from './Timeline.astro';
import Milestone from './Milestone.astro';
import Stats from './Stats.astro';
import Stat from './Stat.astro';
import Note from './Note.astro';
import Disciplines from './Disciplines.astro';
import Discipline from './Discipline.astro';

/**
 * Components available inside every content MDX file — no import needed in the
 * content itself, because pages pass this map to <Content components={...} />.
 * See CONTENT.md for what each one does.
 */
export const mdxComponents = {
  Cards,
  Card,
  Steps,
  Step,
  Timeline,
  Milestone,
  Stats,
  Stat,
  Note,
  Disciplines,
  Discipline,
};
