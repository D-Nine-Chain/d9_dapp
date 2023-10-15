export const main = {
   "source": {
      "hash": "0x6c416880dc1bfdba85c9c416a840898a8e02f9f960554ffa7e6ba9953bf460f2",
      "language": "ink! 4.3.0",
      "compiler": "rustc 1.72.0",
      "build_info": {
         "build_mode": "Release",
         "cargo_contract_version": "3.2.0",
         "rust_toolchain": "stable-aarch64-apple-darwin",
         "wasm_opt_settings": {
            "keep_debug_symbols": false,
            "optimization_passes": "Z"
         }
      }
   },
   "contract": {
      "name": "d9-main",
      "version": "0.1.0",
      "authors": [
         "D9Dev"
      ]
   },
   "spec": {
      "constructors": [
         {
            "args": [
               {
                  "label": "admin",
                  "type": {
                     "displayName": [
                        "AccountId"
                     ],
                     "type": 0
                  }
               },
               {
                  "label": "burn_contracts",
                  "type": {
                     "displayName": [
                        "Vec"
                     ],
                     "type": 3
                  }
               }
            ],
            "default": false,
            "docs": [
               "Constructor that initializes the `bool` value to the given `init_value`."
            ],
            "label": "new",
            "payable": true,
            "returnType": {
               "displayName": [
                  "ink_primitives",
                  "ConstructorResult"
               ],
               "type": 6
            },
            "selector": "0x9bae9d5e"
         }
      ],
      "docs": [],
      "environment": {
         "accountId": {
            "displayName": [
               "AccountId"
            ],
            "type": 0
         },
         "balance": {
            "displayName": [
               "Balance"
            ],
            "type": 4
         },
         "blockNumber": {
            "displayName": [
               "BlockNumber"
            ],
            "type": 21
         },
         "chainExtension": {
            "displayName": [
               "ChainExtension"
            ],
            "type": 22
         },
         "hash": {
            "displayName": [
               "Hash"
            ],
            "type": 20
         },
         "maxEventTopics": 4,
         "timestamp": {
            "displayName": [
               "Timestamp"
            ],
            "type": 5
         }
      },
      "events": [
         {
            "args": [
               {
                  "docs": [
                     " initiator of of the burn"
                  ],
                  "indexed": true,
                  "label": "from",
                  "type": {
                     "displayName": [
                        "AccountId"
                     ],
                     "type": 0
                  }
               },
               {
                  "docs": [
                     "amount of tokens burned"
                  ],
                  "indexed": true,
                  "label": "amount",
                  "type": {
                     "displayName": [
                        "Balance"
                     ],
                     "type": 4
                  }
               }
            ],
            "docs": [],
            "label": "WithdrawalExecuted"
         },
         {
            "args": [
               {
                  "docs": [
                     " initiator of of the burn"
                  ],
                  "indexed": true,
                  "label": "from",
                  "type": {
                     "displayName": [
                        "AccountId"
                     ],
                     "type": 0
                  }
               },
               {
                  "docs": [
                     "amount of tokens burned"
                  ],
                  "indexed": true,
                  "label": "amount",
                  "type": {
                     "displayName": [
                        "Balance"
                     ],
                     "type": 4
                  }
               }
            ],
            "docs": [],
            "label": "BurnExecuted"
         }
      ],
      "lang_error": {
         "displayName": [
            "ink",
            "LangError"
         ],
         "type": 8
      },
      "messages": [
         {
            "args": [
               {
                  "label": "burn_contract",
                  "type": {
                     "displayName": [
                        "AccountId"
                     ],
                     "type": 0
                  }
               }
            ],
            "default": false,
            "docs": [
               " Burns a specified amount from the caller's account and logs the transaction.",
               "",
               " This function allows an account to burn an amount, which is then recorded",
               " in their associated `BurnPortfolio`. The amount is deducted from the sender's",
               " balance and transferred to this main account.",
               "",
               " # Arguments",
               "",
               " * `burn_contract`: The account ID of the contract to which the burned amount will be sent.",
               "",
               " # Requirements",
               "",
               " * The caller must transfer a non-zero amount to this function.",
               " * The specified `burn_contract` must be one of the valid burn contracts recognized by this contract.",
               "",
               " # Returns",
               "",
               " * On success: Returns the updated `BurnPortfolio` for the caller.",
               " * On error: Returns an `Error` indicating the reason for the failure, such as insufficient burn amount or invalid burn contract.",
               "",
               " # Panics",
               "",
               " This function does not explicitly panic but relies on the behavior of the called burn contract.",
               " If the called burn contract reverts or fails, this function will propagate the error.",
               "",
               " # Notes",
               "",
               " * The function uses `ink::selector_bytes` to determine the function signature for the `burn_contract`.",
               " * Updates to the `BurnPortfolio` are persisted to storage.",
               ""
            ],
            "label": "burn",
            "mutates": true,
            "payable": true,
            "returnType": {
               "displayName": [
                  "ink",
                  "MessageResult"
               ],
               "type": 9
            },
            "selector": "0xb1efc17b"
         },
         {
            "args": [
               {
                  "label": "burn_contract",
                  "type": {
                     "displayName": [
                        "AccountId"
                     ],
                     "type": 0
                  }
               }
            ],
            "default": false,
            "docs": [],
            "label": "withdraw",
            "mutates": true,
            "payable": false,
            "returnType": {
               "displayName": [
                  "ink",
                  "MessageResult"
               ],
               "type": 9
            },
            "selector": "0x410fcc9d"
         },
         {
            "args": [
               {
                  "label": "burn_contract",
                  "type": {
                     "displayName": [
                        "AccountId"
                     ],
                     "type": 0
                  }
               }
            ],
            "default": false,
            "docs": [],
            "label": "add_burn_contract",
            "mutates": true,
            "payable": false,
            "returnType": {
               "displayName": [
                  "ink",
                  "MessageResult"
               ],
               "type": 13
            },
            "selector": "0x50cb7e6b"
         },
         {
            "args": [
               {
                  "label": "burn_contract",
                  "type": {
                     "displayName": [
                        "AccountId"
                     ],
                     "type": 0
                  }
               }
            ],
            "default": false,
            "docs": [],
            "label": "remove_burn_contract",
            "mutates": true,
            "payable": false,
            "returnType": {
               "displayName": [
                  "ink",
                  "MessageResult"
               ],
               "type": 6
            },
            "selector": "0x2610355d"
         },
         {
            "args": [],
            "default": false,
            "docs": [],
            "label": "get_admin",
            "mutates": false,
            "payable": false,
            "returnType": {
               "displayName": [
                  "ink",
                  "MessageResult"
               ],
               "type": 16
            },
            "selector": "0x57b8a8a7"
         },
         {
            "args": [],
            "default": false,
            "docs": [],
            "label": "get_total_burned",
            "mutates": false,
            "payable": false,
            "returnType": {
               "displayName": [
                  "ink",
                  "MessageResult"
               ],
               "type": 17
            },
            "selector": "0x717d96e0"
         },
         {
            "args": [
               {
                  "label": "account_id",
                  "type": {
                     "displayName": [
                        "AccountId"
                     ],
                     "type": 0
                  }
               }
            ],
            "default": false,
            "docs": [],
            "label": "get_portfolio",
            "mutates": false,
            "payable": false,
            "returnType": {
               "displayName": [
                  "ink",
                  "MessageResult"
               ],
               "type": 18
            },
            "selector": "0xf3246265"
         }
      ]
   },
   "storage": {
      "root": {
         "layout": {
            "struct": {
               "fields": [
                  {
                     "layout": {
                        "leaf": {
                           "key": "0x00000000",
                           "ty": 0
                        }
                     },
                     "name": "admin"
                  },
                  {
                     "layout": {
                        "leaf": {
                           "key": "0x00000000",
                           "ty": 3
                        }
                     },
                     "name": "burn_contracts"
                  },
                  {
                     "layout": {
                        "root": {
                           "layout": {
                              "struct": {
                                 "fields": [
                                    {
                                       "layout": {
                                          "leaf": {
                                             "key": "0x3c232a60",
                                             "ty": 4
                                          }
                                       },
                                       "name": "amount_burned"
                                    },
                                    {
                                       "layout": {
                                          "leaf": {
                                             "key": "0x3c232a60",
                                             "ty": 4
                                          }
                                       },
                                       "name": "balance_due"
                                    },
                                    {
                                       "layout": {
                                          "leaf": {
                                             "key": "0x3c232a60",
                                             "ty": 4
                                          }
                                       },
                                       "name": "balance_paid"
                                    },
                                    {
                                       "layout": {
                                          "enum": {
                                             "dispatchKey": "0x3c232a60",
                                             "name": "Option",
                                             "variants": {
                                                "0": {
                                                   "fields": [],
                                                   "name": "None"
                                                },
                                                "1": {
                                                   "fields": [
                                                      {
                                                         "layout": {
                                                            "struct": {
                                                               "fields": [
                                                                  {
                                                                     "layout": {
                                                                        "leaf": {
                                                                           "key": "0x3c232a60",
                                                                           "ty": 5
                                                                        }
                                                                     },
                                                                     "name": "time"
                                                                  },
                                                                  {
                                                                     "layout": {
                                                                        "leaf": {
                                                                           "key": "0x3c232a60",
                                                                           "ty": 0
                                                                        }
                                                                     },
                                                                     "name": "contract"
                                                                  }
                                                               ],
                                                               "name": "ActionRecord"
                                                            }
                                                         },
                                                         "name": "0"
                                                      }
                                                   ],
                                                   "name": "Some"
                                                }
                                             }
                                          }
                                       },
                                       "name": "last_withdrawal"
                                    },
                                    {
                                       "layout": {
                                          "struct": {
                                             "fields": [
                                                {
                                                   "layout": {
                                                      "leaf": {
                                                         "key": "0x3c232a60",
                                                         "ty": 5
                                                      }
                                                   },
                                                   "name": "time"
                                                },
                                                {
                                                   "layout": {
                                                      "leaf": {
                                                         "key": "0x3c232a60",
                                                         "ty": 0
                                                      }
                                                   },
                                                   "name": "contract"
                                                }
                                             ],
                                             "name": "ActionRecord"
                                          }
                                       },
                                       "name": "last_burn"
                                    }
                                 ],
                                 "name": "BurnPortfolio"
                              }
                           },
                           "root_key": "0x3c232a60"
                        }
                     },
                     "name": "portfolios"
                  },
                  {
                     "layout": {
                        "leaf": {
                           "key": "0x00000000",
                           "ty": 4
                        }
                     },
                     "name": "total_amount_burned"
                  }
               ],
               "name": "D9Main"
            }
         },
         "root_key": "0x00000000"
      }
   },
   "types": [
      {
         "id": 0,
         "type": {
            "def": {
               "composite": {
                  "fields": [
                     {
                        "type": 1,
                        "typeName": "[u8; 32]"
                     }
                  ]
               }
            },
            "path": [
               "ink_primitives",
               "types",
               "AccountId"
            ]
         }
      },
      {
         "id": 1,
         "type": {
            "def": {
               "array": {
                  "len": 32,
                  "type": 2
               }
            }
         }
      },
      {
         "id": 2,
         "type": {
            "def": {
               "primitive": "u8"
            }
         }
      },
      {
         "id": 3,
         "type": {
            "def": {
               "sequence": {
                  "type": 0
               }
            }
         }
      },
      {
         "id": 4,
         "type": {
            "def": {
               "primitive": "u128"
            }
         }
      },
      {
         "id": 5,
         "type": {
            "def": {
               "primitive": "u64"
            }
         }
      },
      {
         "id": 6,
         "type": {
            "def": {
               "variant": {
                  "variants": [
                     {
                        "fields": [
                           {
                              "type": 7
                           }
                        ],
                        "index": 0,
                        "name": "Ok"
                     },
                     {
                        "fields": [
                           {
                              "type": 8
                           }
                        ],
                        "index": 1,
                        "name": "Err"
                     }
                  ]
               }
            },
            "params": [
               {
                  "name": "T",
                  "type": 7
               },
               {
                  "name": "E",
                  "type": 8
               }
            ],
            "path": [
               "Result"
            ]
         }
      },
      {
         "id": 7,
         "type": {
            "def": {
               "tuple": []
            }
         }
      },
      {
         "id": 8,
         "type": {
            "def": {
               "variant": {
                  "variants": [
                     {
                        "index": 1,
                        "name": "CouldNotReadInput"
                     }
                  ]
               }
            },
            "path": [
               "ink_primitives",
               "LangError"
            ]
         }
      },
      {
         "id": 9,
         "type": {
            "def": {
               "variant": {
                  "variants": [
                     {
                        "fields": [
                           {
                              "type": 10
                           }
                        ],
                        "index": 0,
                        "name": "Ok"
                     },
                     {
                        "fields": [
                           {
                              "type": 8
                           }
                        ],
                        "index": 1,
                        "name": "Err"
                     }
                  ]
               }
            },
            "params": [
               {
                  "name": "T",
                  "type": 10
               },
               {
                  "name": "E",
                  "type": 8
               }
            ],
            "path": [
               "Result"
            ]
         }
      },
      {
         "id": 10,
         "type": {
            "def": {
               "composite": {
                  "fields": [
                     {
                        "name": "amount_burned",
                        "type": 4,
                        "typeName": "Balance"
                     },
                     {
                        "name": "balance_due",
                        "type": 4,
                        "typeName": "Balance"
                     },
                     {
                        "name": "balance_paid",
                        "type": 4,
                        "typeName": "Balance"
                     },
                     {
                        "name": "last_withdrawal",
                        "type": 11,
                        "typeName": "Option<ActionRecord>"
                     },
                     {
                        "name": "last_burn",
                        "type": 12,
                        "typeName": "ActionRecord"
                     }
                  ]
               }
            },
            "path": [
               "d9_burn_common",
               "BurnPortfolio"
            ]
         }
      },
      {
         "id": 11,
         "type": {
            "def": {
               "variant": {
                  "variants": [
                     {
                        "index": 0,
                        "name": "None"
                     },
                     {
                        "fields": [
                           {
                              "type": 12
                           }
                        ],
                        "index": 1,
                        "name": "Some"
                     }
                  ]
               }
            },
            "params": [
               {
                  "name": "T",
                  "type": 12
               }
            ],
            "path": [
               "Option"
            ]
         }
      },
      {
         "id": 12,
         "type": {
            "def": {
               "composite": {
                  "fields": [
                     {
                        "name": "time",
                        "type": 5,
                        "typeName": "Timestamp"
                     },
                     {
                        "name": "contract",
                        "type": 0,
                        "typeName": "AccountId"
                     }
                  ]
               }
            },
            "path": [
               "d9_burn_common",
               "ActionRecord"
            ]
         }
      },
      {
         "id": 13,
         "type": {
            "def": {
               "variant": {
                  "variants": [
                     {
                        "fields": [
                           {
                              "type": 14
                           }
                        ],
                        "index": 0,
                        "name": "Ok"
                     },
                     {
                        "fields": [
                           {
                              "type": 8
                           }
                        ],
                        "index": 1,
                        "name": "Err"
                     }
                  ]
               }
            },
            "params": [
               {
                  "name": "T",
                  "type": 14
               },
               {
                  "name": "E",
                  "type": 8
               }
            ],
            "path": [
               "Result"
            ]
         }
      },
      {
         "id": 14,
         "type": {
            "def": {
               "variant": {
                  "variants": [
                     {
                        "fields": [
                           {
                              "type": 7
                           }
                        ],
                        "index": 0,
                        "name": "Ok"
                     },
                     {
                        "fields": [
                           {
                              "type": 15
                           }
                        ],
                        "index": 1,
                        "name": "Err"
                     }
                  ]
               }
            },
            "params": [
               {
                  "name": "T",
                  "type": 7
               },
               {
                  "name": "E",
                  "type": 15
               }
            ],
            "path": [
               "Result"
            ]
         }
      },
      {
         "id": 15,
         "type": {
            "def": {
               "variant": {
                  "variants": [
                     {
                        "index": 0,
                        "name": "BurnAmountInsufficient"
                     },
                     {
                        "index": 1,
                        "name": "NoAccountFound"
                     },
                     {
                        "index": 2,
                        "name": "EarlyWithdrawalAttempt"
                     },
                     {
                        "index": 3,
                        "name": "ContractBalanceTooLow"
                     },
                     {
                        "index": 4,
                        "name": "RestrictedFunction"
                     },
                     {
                        "index": 5,
                        "name": "UsePortfolioExecuteFunction"
                     },
                     {
                        "index": 6,
                        "name": "WithdrawalExceedsBalance"
                     },
                     {
                        "index": 7,
                        "name": "TransferFailed"
                     },
                     {
                        "index": 8,
                        "name": "InvalidCaller"
                     },
                     {
                        "index": 9,
                        "name": "InvalidBurnContract"
                     },
                     {
                        "index": 10,
                        "name": "BurnContractAlreadyAdded"
                     }
                  ]
               }
            },
            "path": [
               "d9_burn_common",
               "Error"
            ]
         }
      },
      {
         "id": 16,
         "type": {
            "def": {
               "variant": {
                  "variants": [
                     {
                        "fields": [
                           {
                              "type": 0
                           }
                        ],
                        "index": 0,
                        "name": "Ok"
                     },
                     {
                        "fields": [
                           {
                              "type": 8
                           }
                        ],
                        "index": 1,
                        "name": "Err"
                     }
                  ]
               }
            },
            "params": [
               {
                  "name": "T",
                  "type": 0
               },
               {
                  "name": "E",
                  "type": 8
               }
            ],
            "path": [
               "Result"
            ]
         }
      },
      {
         "id": 17,
         "type": {
            "def": {
               "variant": {
                  "variants": [
                     {
                        "fields": [
                           {
                              "type": 4
                           }
                        ],
                        "index": 0,
                        "name": "Ok"
                     },
                     {
                        "fields": [
                           {
                              "type": 8
                           }
                        ],
                        "index": 1,
                        "name": "Err"
                     }
                  ]
               }
            },
            "params": [
               {
                  "name": "T",
                  "type": 4
               },
               {
                  "name": "E",
                  "type": 8
               }
            ],
            "path": [
               "Result"
            ]
         }
      },
      {
         "id": 18,
         "type": {
            "def": {
               "variant": {
                  "variants": [
                     {
                        "fields": [
                           {
                              "type": 19
                           }
                        ],
                        "index": 0,
                        "name": "Ok"
                     },
                     {
                        "fields": [
                           {
                              "type": 8
                           }
                        ],
                        "index": 1,
                        "name": "Err"
                     }
                  ]
               }
            },
            "params": [
               {
                  "name": "T",
                  "type": 19
               },
               {
                  "name": "E",
                  "type": 8
               }
            ],
            "path": [
               "Result"
            ]
         }
      },
      {
         "id": 19,
         "type": {
            "def": {
               "variant": {
                  "variants": [
                     {
                        "index": 0,
                        "name": "None"
                     },
                     {
                        "fields": [
                           {
                              "type": 10
                           }
                        ],
                        "index": 1,
                        "name": "Some"
                     }
                  ]
               }
            },
            "params": [
               {
                  "name": "T",
                  "type": 10
               }
            ],
            "path": [
               "Option"
            ]
         }
      },
      {
         "id": 20,
         "type": {
            "def": {
               "composite": {
                  "fields": [
                     {
                        "type": 1,
                        "typeName": "[u8; 32]"
                     }
                  ]
               }
            },
            "path": [
               "ink_primitives",
               "types",
               "Hash"
            ]
         }
      },
      {
         "id": 21,
         "type": {
            "def": {
               "primitive": "u32"
            }
         }
      },
      {
         "id": 22,
         "type": {
            "def": {
               "variant": {}
            },
            "path": [
               "ink_env",
               "types",
               "NoChainExtension"
            ]
         }
      }
   ],
   "version": "4"
}