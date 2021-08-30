import { ChangeDetectionStrategy, Component } from '@angular/core';

interface ListItem {
  readonly text: string;
  readonly extraText?: string;
  readonly icon?: string;
  readonly link?: string;
}

interface CardItem {
  readonly title: string;
  readonly items: {
    readonly subHeading?: string;
    readonly listItems: readonly ListItem[];
  }[];
}

@Component({
  selector: 'formidable-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  private readonly _usefulness: readonly ListItem[] = [
    {
      text: 'Poți întocmi dosarul și să plătești taxa de înscriere și de confirmare',
      icon: 'check_circle',
    },
    {
      text: 'Poți crea și trimite unul sau mai multe dosare de înscriere',
      icon: 'check_circle',
    },
    {
      text: 'Poți transmite dosarul de înscriere și înaintea perioadei alocate*',
      extraText:
        '*Analiza se va face în termen de 48 de ore de la începerea efectivă a înscrierilor',
      icon: 'check_circle',
    },
  ];

  private readonly _calendars: readonly ListItem[] = [
    {
      text: 'Licență',
      link: 'https://admitere.upt.ro/docs/Calendar%20admitere%20licenta%20septembrie%202021.pdf',
      icon: 'link',
    },
    {
      text: 'Master',
      link: 'https://admitere.upt.ro/docs/Calendar%20admitere%20master%20septembrie%202021.pdf',
      icon: 'link',
    },
    {
      text: 'Doctorat',
      link: 'https://admitere.upt.ro/docs/Calendar%20admitere%20doctorat%20septembrie%202021.pdf',
      icon: 'link',
    },
  ];

  readonly cards: readonly CardItem[] = [
    {
      title: 'Ce poți face pe această platformă?',
      items: [
        {
          subHeading:
            'Aici poți să te înscrii la ciclurile de licență, master și doctorat în cadrul UPT',
          listItems: this._usefulness,
        },
      ],
    },
    {
      title: 'Informații utile',
      items: [
        {
          subHeading: 'Calendarele admiterii pentru sesiunea septembrie 2021:',
          listItems: this._calendars,
        },
        {
          subHeading:
            'Pentru informaţii suplimentare cu privire la înscriere puteţi contacta &nbsp; <a class="email" href="mailto:admitere@upt.ro">admitere@upt.ro</a>',
          listItems: [],
        },
      ],
    },
  ];
}
