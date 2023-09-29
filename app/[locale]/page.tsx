import { Navbar } from "@/components/Navbar";
import {useTranslations} from 'next-intl';
 

export default function Home() {
    const t = useTranslations('Index');
  return (
    <div>
      <Navbar />
      <main>{t('title')}</main>
    </div>
  );
}
