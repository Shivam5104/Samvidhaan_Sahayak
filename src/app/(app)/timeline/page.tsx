import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Calendar } from 'lucide-react';

const timelineData = [
    {
        year: '1946',
        title: 'Constituent Assembly Formed',
        description: `The Constituent Assembly of India was elected to write the Constitution of India. It was formed on the recommendation of the Cabinet Mission Plan. The assembly members were elected by the provincial assemblies by a single, transferable-vote system of proportional representation. The total membership of the Constituent Assembly was 389, of which 292 were representatives of the provinces, 93 represented the princely states, and four were from the chief commissioner provinces of Delhi, Ajmer-Merwara, Coorg, and British Baluchistan.`,
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: 'assembly old photo',
    },
    {
        year: '1947',
        title: 'Drafting Committee Appointed',
        description: `On 29th August 1947, the Constituent Assembly set up a Drafting Committee under the Chairmanship of Dr. B.R. Ambedkar to prepare a Draft Constitution for India. While deliberating upon the draft Constitution, the Assembly moved, discussed and disposed of as many as 2,473 amendments out of a total of 7,635 tabled.`,
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: 'B.R. Ambedkar',
    },
    {
        year: '1949',
        title: 'Constitution Adopted',
        description: `The Constitution of India was adopted by the Constituent Assembly on 26th November 1949. This date is celebrated in India as Constitution Day or Samvidhan Divas. The Constitution came into effect on 26th January 1950, which is celebrated as Republic Day.`,
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: 'constitution document',
    },
    {
        year: '1951',
        title: 'First Amendment Act, 1951',
        description: `The First Amendment to the Constitution of India, enacted in 1951, made several changes to the Fundamental Rights provisions. It empowered the state to make special provisions for the advancement of socially and economically backward classes. It also added the Ninth Schedule to protect land reform and other laws from judicial review. It also added three more grounds of restrictions on freedom of speech and expression, viz., public order, friendly relations with foreign states and incitement to an offence.`,
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: 'parliament building',
    },
    {
        year: '1973',
        title: 'Kesavananda Bharati v. State of Kerala',
        description: `This landmark Supreme Court case established the "Basic Structure Doctrine" of the Indian Constitution. The court held that while Parliament has the power to amend the Constitution, it cannot alter its "basic structure" or "fundamental features." This judgment is a cornerstone of Indian constitutional law, ensuring that the core principles of the constitution remain intact and cannot be destroyed by parliamentary amendments.`,
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: 'supreme court india',
    },
    {
        year: '1976',
        title: '42nd Amendment Act, 1976',
        description: `The 42nd Amendment, enacted during the Emergency, is one of the most controversial amendments. It attempted to reduce the power of the Supreme Court and High Courts to pronounce upon the constitutional validity of laws. It also laid down the Fundamental Duties of Indian citizens and added the words "SOCIALIST" and "SECULAR" to the Preamble. Many of its provisions were later repealed by the 43rd and 44th Amendments.`,
        imageUrl: 'https://placehold.co/600x400.png',
        imageHint: 'law book',
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
      
      <div className="relative">
        {/* The vertical line */}
        <div className="absolute left-4 md:left-1/2 -ml-px w-0.5 h-full bg-border" aria-hidden="true"></div>
        
        <div className="space-y-12">
          {timelineData.map((item, index) => (
            <div key={index} className="relative flex items-start">
              {/* Dot on the timeline */}
              <div className="absolute left-4 md:left-1/2 -ml-2 w-4 h-4 rounded-full bg-primary border-2 border-background"></div>
              
              <div className={`w-full p-4 pl-10 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:ml-auto md:text-left'}`}>
                 <Card className="w-full">
                    <Accordion type="single" collapsible>
                        <AccordionItem value={`item-${index}`} className="border-b-0">
                            <AccordionTrigger className="p-6 hover:no-underline">
                                <div className={`flex flex-col w-full ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <p className="text-muted-foreground">{item.year}</p>
                                    </div>
                                    <h2 className="text-xl font-semibold text-primary">{item.title}</h2>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-6 pt-0">
                                <div className="space-y-4">
                                     <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        width={600}
                                        height={400}
                                        data-ai-hint={item.imageHint}
                                        className="rounded-lg object-cover w-full aspect-video mb-4"
                                    />
                                    <p className="text-muted-foreground leading-relaxed text-left">{item.description}</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                 </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
