import type { Schema, Struct } from '@strapi/strapi';

export interface SharedDay extends Struct.ComponentSchema {
  collectionName: 'components_shared_days';
  info: {
    displayName: 'Day';
  };
  attributes: {
    day: Schema.Attribute.String;
    hour: Schema.Attribute.String;
  };
}

export interface SharedDog extends Struct.ComponentSchema {
  collectionName: 'components_shared_dogs';
  info: {
    displayName: 'Dog';
  };
  attributes: {};
}

export interface SharedIntroduction extends Struct.ComponentSchema {
  collectionName: 'components_shared_introductions';
  info: {
    displayName: 'Introduction';
  };
  attributes: {
    paragraph: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    legend: Schema.Attribute.String;
  };
}

export interface SharedParagraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_paragraphs';
  info: {
    displayName: 'Paragraphe';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

export interface SharedParagraphSubtitle extends Struct.ComponentSchema {
  collectionName: 'components_shared_paragraph_subtitles';
  info: {
    displayName: 'Sous-titre + paragraphe';
  };
  attributes: {
    paragraph: Schema.Attribute.Text;
    subtitle: Schema.Attribute.String;
  };
}

export interface SharedPersonalInformation extends Struct.ComponentSchema {
  collectionName: 'components_shared_personal_informations';
  info: {
    displayName: 'Personal_information';
  };
  attributes: {
    Adress: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'1015 Saulnier St, Houston, USA'>;
    Adress2: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'1015 Saulnier St, Houston, USA'>;
    Email: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'hello@Labubu.com'>;
    Phone: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'+1 (323) 113-2213'>;
  };
}

export interface SharedQuestion extends Struct.ComponentSchema {
  collectionName: 'components_shared_questions';
  info: {
    displayName: 'question';
  };
  attributes: {
    question: Schema.Attribute.Relation<'oneToOne', 'api::question.question'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Citation';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.day': SharedDay;
      'shared.dog': SharedDog;
      'shared.introduction': SharedIntroduction;
      'shared.media': SharedMedia;
      'shared.paragraph': SharedParagraph;
      'shared.paragraph-subtitle': SharedParagraphSubtitle;
      'shared.personal-information': SharedPersonalInformation;
      'shared.question': SharedQuestion;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
