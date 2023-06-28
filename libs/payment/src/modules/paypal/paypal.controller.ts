import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CaptureOrderDto } from './dto/capture-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreatePayoutDto } from './dto/create-payout.dto';
import { PaypalService } from './paypal.service';

@ApiTags('paypal')
@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Get('get-order/:id')
  getOrder(@Param('id') id: string) {
    return this.paypalService.getOrder(id);
  }

  @Get('get-payout/:id')
  getPayout(@Param('id') id: string) {
    return this.paypalService.getPayout(id);
  }

  @Post('capture-order')
  captureOrder(@Body() capturePaypalDto: CaptureOrderDto) {
    return this.paypalService.captureOrder(capturePaypalDto.orderId);
  }

  @Post('create-order')
  createOrder(@Body() createPaypalDto: CreateOrderDto) {
    return this.paypalService.createOrder(createPaypalDto.amount);
  }

  @Post('create-payout')
  createPayout(@Body() createPayoutDto: CreatePayoutDto) {
    return this.paypalService.createPayout(createPayoutDto);
  }
}
