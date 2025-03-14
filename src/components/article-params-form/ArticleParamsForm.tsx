import { useEffect, useRef, useState } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Separator } from 'src/ui/separator/Separator';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type TArticleParamsForm = {
	setArticleState: (newTypes: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticleState }: TArticleParamsForm) => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);

	const [selectedValue, setSelectedValue] = useState(defaultArticleState);

	useEffect(() => {
		if (!isOpen) return;
		const handleClickOutside = (e: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const resetForm = () => {
		setSelectedValue(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectedValue((prev) => ({ ...prev, [key]: value }));
	};

	const submitChanges = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleState(selectedValue);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
			<aside
				ref={formRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={submitChanges}
					onReset={resetForm}>
					<Text as='h2' size={31} uppercase weight={800}>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={selectedValue.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(value) => handleChange('fontFamilyOption', value)}
					/>

					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={selectedValue.fontSizeOption}
						onChange={(value) => handleChange('fontSizeOption', value)}
						title='Размер шрифта'
					/>

					<Select
						title='Цвет шрифта'
						selected={selectedValue.fontColor}
						options={fontColors}
						onChange={(value) => handleChange('fontColor', value)}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={selectedValue.backgroundColor}
						options={backgroundColors}
						onChange={(value) => handleChange('backgroundColor', value)}
					/>

					<Select
						title='Ширина контента'
						selected={selectedValue.contentWidth}
						options={contentWidthArr}
						onChange={(value) => handleChange('contentWidth', value)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
