import React, { useState, useRef, useEffect } from 'react';
import './css/MultiSelectDropdown.css'

interface Option {
  value: string;
  label: string;
}

interface MultiSelectDropdownProps {
  labelName : string;
  options: Option[];
}

const MultiSelectDropdown: any = ({ options, labelName }:MultiSelectDropdownProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown menu when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const toggleDropdown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevents default form submission behavior
    setIsOpen(!isOpen);
  };

  const handleItemClick = (option: any) => {
    const newValue = option.value;

    if (selectedItems.includes(newValue)) {
      setSelectedItems(selectedItems.filter(item => item !== newValue));
    } else {
      setSelectedItems([...selectedItems, newValue]);
    }
  };

  return {selectedItems:selectedItems,element:(
    <div className="multi-select-dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle labelName-btn" onClick={toggleDropdown}>
        {labelName}
        {isOpen && <span> &nbsp; &#x2191; </span>}
        {!isOpen && <span> &nbsp;  &#x2193;</span>}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map(option => (
            <div key={option.value} className="dropdown-item">
              <input
                type="checkbox"
                id={option.value}
                className='multi-select'
                value={option.value}
                checked={selectedItems.includes(option.value)}
                onChange={() => handleItemClick(option)}
              />
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  )}
};

export default MultiSelectDropdown;
