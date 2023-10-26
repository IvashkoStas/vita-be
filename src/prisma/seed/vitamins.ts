export const vitamins = {
  a: {
    data: {
      category: 'A',
      alt_name: 'ретинол',
      function:
        'Отвечает за здоровье глаз, поддерживает иммунитет, а также влияет на регенерацию клеток, повышая защитные функции кожи и слизистых',
      products:
        'Морковь, болгарский перец, тыква, батат, брокколи, сельдерей, персики, шпинат, дыня, жир из печени трески, печень, молоко, яичные желтки, красная икра, чёрная икра',
      isMineral: false,
      conditions: {
        create: [
          {
            icon: 'fat',
            text: 'Жирорастворимый-употреблять с жиросодержащей пищей',
          },
          {
            icon: 'moon-sone',
            text: 'Принимать утром или поздно вечером ',
          },
          {
            icon: 'eat',
            text: 'Через 10-15 минут после еды',
          },
        ],
      },
      combinations: {
        create: {
          positive: 'С, B15, D, Е, цинк, йод, железо',
          negative: 'В12, Витамин К',
        },
      },
      norm: {
        create: {
          child: '400-1000 мкг',
          men: '650-950 мкг',
          women: '600-800 мкг',
          pregnant: '700-900 мкг',
        },
      },
    },
  },
  b1: {
    data: {
      category: 'В1',
      alt_name: 'тиамин, аневрин',
      function:
        'Важен для правильного функционирования нервной системы, печени, сердца. Участвует в углеводном обмене и помогает при лечении кожных заболеваний',
      products:
        'Овсянка, пшено, гречка, дрожжи, картофель, цветная капуста, морковь, свекла, тыква, семена и орехи, бобовые культуры, печень, свинина, ржаной хлеб, бурый рис, крольчатина',
      isMineral: false,
      conditions: {
        create: [
          {
            icon: 'water',
            text: 'Водорастворимый-запивать водой',
          },
          {
            icon: 'noonday',
            text: 'Принимать утром',
          },
          {
            icon: 'no-eat',
            text: 'На пустой желудок',
          },
        ],
      },
      combinations: {
        create: {
          positive: 'В5, В7, В8, магний',
          negative: 'B2, B3, B4, B6, B12, кальций',
        },
      },
      norm: {
        create: {
          child: '400-1000 мкг',
          men: '650-950 мкг',
          women: '600-800 мкг',
          pregnant: '700-900 мкг',
        },
      },
    },
  },
  b2: {
    data: {
      category: 'В2',
      alt_name: 'рибофлавин',
      function:
        'Необходим для здоровья глаз и иммунной системы. Также он обеспечивает ткани кислородом и участвует в метаболизме белков, жиров и углеводов',
      products:
        'Яйца, творог, сыр, сметана, кефир, молоко, говядина, свинина, крольчатина, курица, гречка, овсянка, шпинат, зелёный горошек, рыба, цветная капуста, зелёный лук, укроп',
      conditions: {
        create: [
          {
            icon: 'water',
            text: 'Водорастворимый-запивать водой',
          },
          {
            icon: 'noonday',
            text: 'Принимать утром',
          },
          {
            icon: 'eat',
            text: 'Недопустимо на голодный желудок',
          },
        ],
      },
      combinations: {
        create: {
          positive: 'B3, B5, B6, B9, витамин К, железо, магний, цинк',
          negative: 'B1, B12, кальций, медь',
        },
      },
      norm: {
        create: {
          child: '0,3-0,9мг',
          men: '1,6-1,8мг',
          women: '1,2-1,3мг',
          pregnant: '2,2-2,4мг',
        },
      },
    },
  },
  b9: {
    data: {
      category: 'В9',
      alt_name: 'фолиевая кислота, витамин M',
      function:
        'Поддерживает работу сердца и сосудов, участвует в создании яйцеклеток и нормализации менструального цикла, способствует нормализации уровня сахара в крови, участвует в процессе деления клеток',
      products:
        'Салат, капуста, шпинат, брокколи, мука грубого помола, цитрусы, печень, лосось, тунец, бананы, морковь, абрикосы, папайя, спаржа, бобовые культуры',
      isMineral: false,
      conditions: {
        create: [
          {
            icon: 'water',
            text: 'Водорастворимый-запивать водой',
          },
          {
            icon: 'noonday',
            text: 'Первая половина дня',
          },
          {
            icon: 'eat',
            text: 'Во время или после еды',
          },
        ],
      },
      combinations: {
        create: {
          positive: 'B2, B4, B5, B7, B12, С, Р, магний',
          negative: 'B6, цинк',
        },
      },
      norm: {
        create: {
          child: '40-200 мг',
          men: '400 мг',
          women: '400 мг',
          pregnant: '600 мг',
        },
      },
    },
  },
};