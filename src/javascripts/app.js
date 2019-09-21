import { $, $$ } from './lib/bling';

// ! delete me ! //
$('.test').on(
  'click',
  () => ($('.test').style.color = $('.test').style.color !== 'red' ? 'red' : 'blue'),
);
