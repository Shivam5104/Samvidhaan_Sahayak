import { config } from 'dotenv';
config();

import '@/ai/flows/identify-article.ts';
import '@/ai/flows/legal-recourse-explanation.ts';
import '@/ai/flows/violation-punishments.ts';
import '@/ai/flows/article-summary.ts';
import '@/ai/flows/case-study.ts';
import '@/ai/flows/compare-articles.ts';
import '@/ai/flows/explain-preamble-keyword.ts';
import '@/ai/flows/text-to-speech.ts';
