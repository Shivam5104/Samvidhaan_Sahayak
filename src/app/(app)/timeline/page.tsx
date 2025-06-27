
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Calendar } from 'lucide-react';

const timelineData = [
    {
        year: '1946',
        title: 'Constituent Assembly Formed',
        description: `The Constituent Assembly of India was elected to write the Constitution of India. It was formed on the recommendation of the Cabinet Mission Plan. The assembly members were elected by the provincial assemblies by a single, transferable-vote system of proportional representation. The total membership of the Constituent Assembly was 389, of which 292 were representatives of the provinces, 93 represented the princely states, and four were from the chief commissioner provinces of Delhi, Ajmer-Merwara, Coorg, and British Baluchistan.`,
    },
    {
        year: '1947',
        title: 'Drafting Committee Appointed',
        description: `On 29th August 1947, the Constituent Assembly set up a Drafting Committee under the Chairmanship of Dr. B.R. Ambedkar to prepare a Draft Constitution for India. While deliberating upon the draft Constitution, the Assembly moved, discussed and disposed of as many as 2,473 amendments out of a total of 7,635 tabled.`,
    },
    {
        year: '1949',
        title: 'Constitution Adopted',
        description: `The Constitution of India was adopted by the Constituent Assembly on 26th November 1949. This date is celebrated in India as Constitution Day or Samvidhan Divas. The Constitution came into effect on 26th January 1950, which is celebrated as Republic Day.`,
    },
    {
        year: '1951',
        title: 'First Amendment Act, 1951',
        description: `The First Amendment to the Constitution of India, enacted in 1951, made several changes to the Fundamental Rights provisions. It empowered the state to make special provisions for the advancement of socially and economically backward classes. It also added the Ninth Schedule to protect land reform and other laws from judicial review. It also added three more grounds of restrictions on freedom of speech and expression, viz., public order, friendly relations with foreign states and incitement to an offence.`,
    },
    {
        year: '1973',
        title: 'Kesavananda Bharati v. State of Kerala',
        description: `This landmark Supreme Court case established the "Basic Structure Doctrine" of the Indian Constitution. The court held that while Parliament has the power to amend the Constitution, it cannot alter its "basic structure" or "fundamental features." This judgment is a cornerstone of Indian constitutional law, ensuring that the core principles of the constitution remain intact and cannot be destroyed by parliamentary amendments.`,
    },
    {
        year: '1976',
        title: '42nd Amendment Act, 1976',
        description: `The 42nd Amendment, enacted during the Emergency, is one of the most controversial amendments. It attempted to reduce the power of the Supreme Court and High Courts to pronounce upon the constitutional validity of laws. It also laid down the Fundamental Duties of Indian citizens and added the words "SOCIALIST" and "SECULAR" to the Preamble. Many of its provisions were later repealed by the 43rd and 44th Amendments.`,
    },
    {
        year: '1978',
        title: '44th Amendment Act, 1978',
        description: `Enacted after the end of the Emergency, this amendment aimed to reverse many of the distorting provisions of the 42nd Amendment. It restored the jurisdiction of the Supreme Court and High Courts. Crucially, it removed the Right to Property from the list of Fundamental Rights and converted it into a legal right under Article 300-A, meaning it could be regulated by law without constitutional amendment.`,
    },
    {
        year: '1992',
        title: '73rd and 74th Amendment Acts, 1992',
        description: `These amendments gave constitutional status to Panchayati Raj institutions (for rural areas) and Urban Local Bodies (for urban areas), thereby establishing a three-tier system of governance. They aimed to foster democratic decentralization and empower local governments with the responsibility of economic development and social justice.`,
    },
    {
        year: '1992',
        title: 'Indra Sawhney & Others v. Union of India',
        description: `Also known as the "Mandal Commission case," the Supreme Court upheld the implementation of reservations for Other Backward Classes (OBCs) in public employment. However, it laid down a 50% cap on total reservations and introduced the concept of the "creamy layer," stipulating that the socially and educationally advanced members of OBCs were not eligible for reservation benefits.`,
    },
    {
        year: '2002',
        title: '86th Amendment Act, 2002',
        description: `This amendment made elementary education a Fundamental Right. It added Article 21-A, which mandates the State to provide free and compulsory education to all children between the ages of six and fourteen. It also modified Article 51-A (Fundamental Duties) to include a duty for every parent or guardian to provide opportunities for education to their child.`,
    },
    {
        year: '2016',
        title: '101st Amendment Act, 2016',
        description: `This amendment introduced the Goods and Services Tax (GST) into the Indian taxation system. It subsumed many indirect taxes levied by the central and state governments, creating a unified market. The goal was to simplify the tax structure, reduce cascading taxes, and improve economic efficiency.`,
    },
    {
        year: '2019',
        title: '103rd Amendment Act, 2019',
        description: `This amendment introduced a 10% reservation for Economically Weaker Sections (EWS) in educational institutions and for appointments in public employment. This reservation is for individuals who are not covered by any of the existing reservation schemes for SCs, STs, and OBCs.`,
    },
    {
        year: '2019',
        title: 'Abrogation of Article 370',
        description: 'The special status of Jammu and Kashmir under Article 370 of the Constitution was revoked. This led to the reorganization of the state into two union territories: Jammu and Kashmir, and Ladakh. The Supreme Court upheld the constitutional validity of this move in December 2023.',
    },
    {
        year: '2021',
        title: '105th Amendment Act, 2021',
        description: 'This amendment restored the power of state governments to identify and specify Socially and Educationally Backward Classes (SEBCs). It clarified that states can maintain their own lists of SEBCs, separate from the central list, for the purpose of reservations.',
    },
    {
        year: '2023',
        title: '106th Amendment Act, 2023 (Nari Shakti Vandan Adhiniyam)',
        description: 'This historic amendment provides for the reservation of one-third of all seats for women in the Lok Sabha and in all state legislative assemblies. The implementation of this reservation is contingent upon the completion of a new census and a subsequent delimitation exercise.',
    },
];

export default function TimelinePage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">Timeline of the Indian Constitution</h1>
        <p className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground">
            Explore the key milestones in the journey of India's foundational legal document, from its inception to landmark amendments and judgments.
        </p>
      </header>
      
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {timelineData.map((item, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1 h-full">
                <Card className="h-full flex flex-col">
                    <Accordion type="single" collapsible className="w-full flex-grow flex flex-col">
                        <AccordionItem value={`item-${index}`} className="border-b-0 flex-grow flex flex-col">
                            <AccordionTrigger className="p-6 hover:no-underline">
                                <div className="flex flex-col w-full items-start text-left">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <p className="text-muted-foreground">{item.year}</p>
                                    </div>
                                    <h2 className="text-xl font-semibold text-primary">{item.title}</h2>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-6 pt-0 flex-grow">
                                <div className="space-y-4">
                                    <p className="text-muted-foreground leading-relaxed text-left">{item.description}</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                 </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
