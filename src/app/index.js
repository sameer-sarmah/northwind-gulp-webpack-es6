
import $ from 'jquery';
import "styles/global.css"

const $main = $('#main');

export const render = (markup) => $main.append(markup());

export const pageInit = (markup) => {
  $(document).ready(() => render(markup));
};