import * as React from 'react';
import classNames from 'classnames';
import DateBody, { DateBodyPassProps, DateRender } from './DateBody';
import DateHeader from './DateHeader';
import { PanelSharedProps } from '../../interface';
import { WEEK_DAY_COUNT, getEnabledDate } from '../../utils/dateUtil';
import { createKeyDownHandler, KeyboardConfig } from '../../utils/uiUtil';

const DATE_ROW_COUNT = 6;

export interface DatePanelProps<DateType>
  extends PanelSharedProps<DateType>,
    DateBodyPassProps<DateType> {
  active?: boolean;
  dateRender?: DateRender<DateType>;

  // Used for week panel
  panelName?: string;
  keyboardConfig?: KeyboardConfig;
}

function DatePanel<DateType>(props: DatePanelProps<DateType>) {
  const {
    prefixCls,
    panelName = 'date',
    keyboardConfig,
    active,
    operationRef,
    generateConfig,
    value,
    viewDate,
    disabledDate,
    onViewDateChange,
    onPanelChange,
    onSelect,
  } = props;

  const panelPrefixCls = `${prefixCls}-${panelName}-panel`;

  // ======================= Keyboard =======================
  operationRef.current = {
    onKeyDown: (event) =>
      createKeyDownHandler(event, {
        onLeftRight: (diff) => {
          getEnabledDate(
            value || viewDate,
            (date) => generateConfig.addDate(date, diff),
            disabledDate,
            (date) => onSelect(date, 'key'),
          );
        },
        onCtrlLeftRight: (diff) => {
          getEnabledDate(
            value || viewDate,
            (date) => generateConfig.addYear(date, diff),
            disabledDate,
            (date) => onSelect(date, 'key'),
          );
        },
        onUpDown: (diff) => {
          getEnabledDate(
            value || viewDate,
            (date) => generateConfig.addDate(date, diff * WEEK_DAY_COUNT),
            disabledDate,
            (date) => onSelect(date, 'key'),
          );
        },
        onPageUpDown: (diff) => {
          getEnabledDate(
            value || viewDate,
            (date) => generateConfig.addMonth(date, diff),
            disabledDate,
            (date) => onSelect(date, 'key'),
          );
        },
        ...keyboardConfig,
      }),
  };

  // ==================== View Operation ====================
  const onYearChange = (diff: number) => {
    const newDate = generateConfig.addYear(viewDate, diff);
    onViewDateChange(newDate);
    onPanelChange(null, newDate);
  };
  const onMonthChange = (diff: number) => {
    const newDate = generateConfig.addMonth(viewDate, diff);
    onViewDateChange(newDate);
    onPanelChange(null, newDate);
  };

  return (
    <div
      className={classNames(panelPrefixCls, {
        [`${panelPrefixCls}-active`]: active,
      })}
    >
      <DateHeader
        {...props}
        prefixCls={prefixCls}
        value={value}
        viewDate={viewDate}
        // View Operation
        onPrevYear={() => {
          onYearChange(-1);
        }}
        onNextYear={() => {
          onYearChange(1);
        }}
        onPrevMonth={() => {
          onMonthChange(-1);
        }}
        onNextMonth={() => {
          onMonthChange(1);
        }}
        onMonthClick={() => {
          onPanelChange('month', viewDate);
        }}
        onYearClick={() => {
          onPanelChange('year', viewDate);
        }}
      />
      <DateBody
        {...props}
        onSelect={(date) => onSelect(date, 'mouse')}
        prefixCls={prefixCls}
        value={value}
        viewDate={viewDate}
        rowCount={DATE_ROW_COUNT}
      />
    </div>
  );
}

export default DatePanel;
