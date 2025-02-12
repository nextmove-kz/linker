import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/LandingAccordion";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    id: "item-1",
    question: "Как будет происходить подключение?",
    answer: `После вашей заявки мы свяжемся с вами, обсудим особенности вашего бизнеса и пожелания по форме заказа. 
      Уже на следующий день вы получите готовый к работе сайт и доступ к личному кабинету. 
      Мы поможем разместить ссылку в Instagram Bio и проведем короткое обучение по использованию системы.`,
  },
  {
    id: "item-2",
    question: "Не потеряю ли я клиентов при переходе с директа на Linker?",
    answer: `Наоборот - сейчас клиенты часто уходят, не дождавшись ответа в директе. 
      Профессиональная форма заказа работает круглосуточно, выглядит солидно и вызывает больше доверия, 
      чем обычная переписка. Клиенты ценят удобство и скорость оформления заказа.`,
  },
  {
    id: "item-3",
    question: "Насколько стабильно работает система?",
    answer: `Мы используем профессиональную облачную инфраструктуру с автоматическим масштабированием под нагрузку. 
      Система работает с гарантированной доступностью 99.9%, а все данные хранятся с резервным копированием. 
      У вас будет прямая связь с командой разработки и директором для оперативного решения любых вопросов.`,
  },
  {
    id: "item-4",
    question: "Как клиенты будут оплачивать заказы?",
    answer: `В форме заказа доступны все привычные способы оплаты: 
      Kaspi-переводы, банковские переводы и наличные при получении. 
      В ближайшее время мы добавим онлайн оплату картой и автоматизацию платежей через популярные платежные системы.`,
  },
  {
    id: "item-5",
    question: "Что если мне нужно обсудить детали заказа с клиентом?",
    answer: `В форме заказа можно добавить поле для комментариев, где клиент укажет особые пожелания. 
      Вы получаете мгновенные уведомления о новых заказах в WhatsApp и можете связаться с клиентом для уточнения деталей. 
      Вся переписка и история заказов сохраняется в едином кабинете.`,
  },
  {
    id: "item-6",
    question: "Мы не уверены, подойдет ли нам Linker",
    answer: `Мы понимаем ваши сомнения и готовы подробно обсудить особенности именно вашего бизнеса. 
      Свяжитесь с нами любым удобным способом — по WhatsApp или через форму на сайте. 
      Мы детально расскажем о возможностях системы, предложим индивидуальные условия и ответим на все ваши вопросы. 
      Для тех, кто сомневается, у нас есть специальные условия тестирования сервиса.`,
  },
];

const GetQuestions = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="w-full flex justify-center flex-col items-center gap-5">
        <p className="bg-violet100 text-primary shadow-none px-8 py-3 w-[280px] rounded-full">
          Часто задаваемые вопросы
        </p>
        <h1 className="text-center uppercase sm:text-[20px] tablet:text-[28px] desktop:text-title font-bold">
          Ответы на <span className="text-orange">часто задаваемые </span>
          вопросы
        </h1>
      </div>
      <Accordion type="single" collapsible className="w-full h-full">
        <div className="flex w-full flex-row desktop:gap-10 items-start justify-center">
          <div className="flex flex-col tablet:w-3/4 w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={item.id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent className="text-gray">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default GetQuestions;
