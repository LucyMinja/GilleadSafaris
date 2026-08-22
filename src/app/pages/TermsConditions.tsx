import { LegalHero, LegalPageWrapper } from '@/app/components/LegalPageLayout';
import SectionsPartOne from './termsconditions/SectionsPartOne';
import SectionsPartTwo from './termsconditions/SectionsPartTwo';

export default function TermsConditions() {
  return (
    <div>
      <LegalHero title="Terms &amp; Conditions" updated="10 June 2026" />

      <LegalPageWrapper>
        <SectionsPartOne />
        <SectionsPartTwo />
      </LegalPageWrapper>
    </div>
  );
}
