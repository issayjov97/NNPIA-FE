export class SearchCriteria {
  category?: string;
  location?: string;
  title?: string;
  description?: string;
  type?: Type;

}
enum Type {
  NEEDS,
  SKILLS
}
