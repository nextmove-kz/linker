import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/LandingAccordion";

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
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Что такое Linker и как он работает?
              </AccordionTrigger>
              <AccordionContent className="text-gray">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Как Linker может помочь моему бизнесу?
              </AccordionTrigger>
              <AccordionContent className="text-gray">
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Подойдет ли Linker для моего бизнеса?
              </AccordionTrigger>
              <AccordionContent className="text-gray">
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Смогу ли я сам разобраться с тем как работает LInker?
              </AccordionTrigger>
              <AccordionContent className="text-gray">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Как подключить подписку?</AccordionTrigger>
              <AccordionContent className="text-gray">
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>
                Могу ли я попробовать Linker бесплатно?
              </AccordionTrigger>
              <AccordionContent className="text-gray">
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
          </div>
        </div>
      </Accordion>
    </div>
  );
};

export default GetQuestions;
