import { SERVER_DATE_TIME_FORMAT } from './../utils/constants';
import * as moment from 'moment';
import * as _ from "lodash"
import { Op } from 'sequelize';
import { MethodNotAllowedException } from '@nestjs/common';

export class TransformParameters {
  private PATTERN_INCLUDE = '$in';
  private PATTERN_GREATER_THAN = '$gte';
  private PATTERN_LESS_THAN = '$lte';
  private PATTERN_REGEX = '$regex';
  private PATTERN_NULL = '$null';

  public offset: number;
  public limit: number;

  public where: any;

  constructor(private readonly requestParams: any) {
    this.where = this.whereTransform();
    this.limit = this.limitTransform();
    this.offset = this.skipTransform();
  }

  private skipTransform() {
    return Number(_.get(this.requestParams, '$skip') ?? 0) ;
  }

  private limitTransform() {
    return Number(_.get(this.requestParams, '$limit') ?? 10) ;
  }

  private whereTransform() {
    let result = {};
    for (const key in this.requestParams) {
      if (this.requestParams.hasOwnProperty(key) && !['$limit', '$skip', 'skip', 'limit'].includes(key)) {
        const value = this.requestParams[key];

        // REGEX [$regex]
        if (typeof value === 'object' && this.PATTERN_REGEX in value) {
          const fieldKey = key;
          const fieldvalue = value[this.PATTERN_REGEX];

          result = {
            ...result,
            [fieldKey]: {
              [Op.like]: `%${fieldvalue}%`,
            },
          };
        }

        // INCLUDE [$in]
        if (typeof value === 'object' && this.PATTERN_INCLUDE in value) {
          const fieldKey = key;
          const fieldValue = value[this.PATTERN_INCLUDE];

          result = {
            ...result,
            [fieldKey]: {
              [Op.in]: fieldValue.replace(/\s/g, '').split(','),
            },
          };
        }

        // GREATER THAN DATE [$gte]
        if (typeof value === 'object' && this.PATTERN_GREATER_THAN in value) {
          const fieldKey = key;
          const fieldValue = value[this.PATTERN_GREATER_THAN];

          const validate = moment(
            fieldValue,
            SERVER_DATE_TIME_FORMAT,
            true,
          ).isValid();
          if (!validate) throw new MethodNotAllowedException('Invalid value [$gte] date format');

          result = {
            ...result,
            [fieldKey]: {
              [Op.gte]: moment(fieldValue).format(SERVER_DATE_TIME_FORMAT),
            },
          };
        }

        // LESS THAN DATE [$lte]
        if (typeof value === 'object' && this.PATTERN_LESS_THAN in value) {
          const fieldKey = key;
          const fieldValue = value[this.PATTERN_LESS_THAN];

          const validate = moment(
            fieldValue,
            SERVER_DATE_TIME_FORMAT,
            true,
          ).isValid();
          if (!validate) throw new MethodNotAllowedException('Invalid value [$lte] date format');

          result = {
            ...result,
            [fieldKey]: {
              [Op.lte]: moment(fieldValue).format(SERVER_DATE_TIME_FORMAT),
            },
          };
        }

        // NULL TRUE / FALSE [$null]
        if (typeof value === 'object' && this.PATTERN_NULL in value) {
          const fieldKey = key;
          const fieldValue = value[this.PATTERN_NULL];
          
          if (fieldValue === 'true') {
            result = {
              ...result,
              [fieldKey]: {
                [Op.is]: null,
              },
            };
          } else if (fieldValue === 'false') {
            result = {
              ...result,
              [fieldKey]: {
                [Op.not]: null,
              },
            };
          } else {
            throw new MethodNotAllowedException('Invalid value [$null] only accept true / false');
          }
        }

        // Equals
        if (typeof value === 'string') {
          const fieldKey = key;
          const fieldValue = value;
          result = {
            ...result,
            [fieldKey]: {
              [Op.eq]: fieldValue,
            },
          };
        }
      }
    }

    return result
  }
}
