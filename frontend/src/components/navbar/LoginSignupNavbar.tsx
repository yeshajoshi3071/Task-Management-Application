import React from 'react';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { cols } from '../../components/LoadJson/LoadJson';
import { translate } from '../Translations/translate';

/**
 * Renders the login/signup navbar component.
 */
const LoginSignupNavbar: React.FC = () => {
  // State variables
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [languageModalOpen, setLanguageModalOpen] = useState<boolean>(false);

  /**
   * Handles the selection of a language.
   * @param languageCode - The code of the selected language.
   */
  const handleLanguageSelect = async (languageCode: string) => {
    setLanguageModalOpen(false);
    await translate(languageCode);
  };

  /**
   * Opens the language modal.
   */
  const openLanguageModal = () => {
    setLanguageModalOpen(true);
  };

  /**
   * Closes the language modal.
   */
  const closeLanguageModal = () => {
    setLanguageModalOpen(false);
  };

  return (
    <nav className="bg-gray-800 text-white py-2 px-4 flex justify-between items-center ">
      <div className="text-lg md:text-xl font-bold mt-2">TaskSphere</div>
      <button
        className="mt-2 text-sm md:text-md  text-white font-bold py-2 px-4 rounded"
        onClick={openLanguageModal}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
        </svg>
      </button>

      <Dialog open={languageModalOpen} onClose={closeLanguageModal}>
        <div className="flex items-center justify-between">
          <DialogTitle style={{ textAlign: 'center' }}>Select Language</DialogTitle>
          <button type="button" className="mr-4 text-gray-400 hover:text-red-500" onClick={closeLanguageModal}>&#x2715;</button>
        </div>
        <DialogContent style={{ backgroundColor: '#303030' }}>
          <div style={{ display: 'flex', gap: '20px', color: 'white' }}>
            {cols.map((column, index) => (
              <List key={index} style={{ flex: 1 }}>
                {column.map((language: { native_name: string; language_code: React.Key | null | undefined; display_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                  <button onClick={() => {
                    if (typeof language.language_code === 'string') {
                      handleLanguageSelect(language.language_code);
                    }
                  }}>
                    <ListItem button key={language.language_code}>
                      <ListItemText primary={language.display_name + '(' + language.native_name + ')'} />
                    </ListItem>
                  </button>
                ))}
              </List>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
};

export default LoginSignupNavbar;
