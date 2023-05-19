import * as React from 'react';
import CreatePromptPageClient from './createPromptPageClient';

interface ICreatePromptPageProps {
}

const CreatePromptPage: React.FC<ICreatePromptPageProps> = (props) => {
  return(
    <div>
        <CreatePromptPageClient />
    </div>
  ) ;
};

export default CreatePromptPage;
