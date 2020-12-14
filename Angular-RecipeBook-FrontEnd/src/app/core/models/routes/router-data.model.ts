import { BrowserTitleDataModel } from './browser-title-data.model';
import { HeaderTitleDataModel } from './header-title-data.model';

export interface RouterDataModel {
  headerTitle: HeaderTitleDataModel;
  browserTitle: BrowserTitleDataModel;
}
